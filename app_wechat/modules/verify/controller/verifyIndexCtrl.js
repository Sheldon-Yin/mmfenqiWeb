/**
 * Created by sheldon on 2016/5/23.
 */
'use strict';

define(function (require, exports, module) {
    module.exports = function (app) {
        require('services/verifyService.js')(app);
        require('services/weChatService.js')(app);
        app.register.controller('VerifyIndexCtrl', ['$scope', '$location', 'Verify', 'WeChatTitle', 'Bridge',
            function ($scope, $location, Verify, WeChatTitle, Bridge) {

                WeChatTitle('我的信用额度');

                $scope.baseUrl = $location.absUrl().split('#')[0];

                $scope.businessRemark = '电商信用授权';
                $scope.bankRemark = '银行流水认证';
                $scope.fastRemark = '信用信息审核';

                Bridge.appToken(function (response) {
                    $scope.appToken = response;
                    $scope.initStatus = function () {
                        $scope.queryVerifyStatus = Verify.queryVerifyStatus().query({
                            appToken: $scope.appToken
                        });
                        $scope.$root.loading = true;
                        $scope.queryVerifyStatus.$promise.then(function (res) {
                            $scope.$root.loading = false;
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

                                $scope.realLoanMoney = res.data.realloanmoney;
                                $scope.availableMoney = res.data.availableMoney;
                                $scope.userType = res.data.userType;

                                if ($scope.userType == 0) {
                                    $scope.firstMoney = 8000;
                                    $scope.secondMoney = 15000;
                                    $scope.thirdMoney = 2000;
                                    $scope.forthMoney = 5000;
                                } else if ($scope.userType == 6) {
                                    $scope.firstMoney = 20000;
                                    $scope.secondMoney = 20000;
                                    $scope.thirdMoney = 5000;
                                    $scope.forthMoney = 5000;
                                }

                            } else if (res.result == 1013) {
                                Toast(res.msg)
                            } else {
                                Toast(res.msg)
                            }
                            console.log(res);
                        }).catch(function (error) {
                            $scope.$root.loading = false;
                            Toast('服务器返回错误');
                        });
                    };


                    $scope.isRealName = Verify.isRealName().query({
                        appToken: $scope.appToken
                    });
                    $scope.$root.loading = true;
                    $scope.isRealName.$promise.then(function (res) {
                        $scope.$root.loading = false;

                        if (res.result == 0) {
                            $scope.realNameStatus = res.data.isIdentityAuth;
                            $scope.initStatus();
                        } else if (res.result == 1013) {
                            Toast(res.msg)
                        } else {
                            Toast(res.msg)
                        }
                    }).catch(function (error) {
                        $scope.$root.loading = false;
                        Toast('服务器返回错误');
                    });

                    $scope.goToZmVerify = function (x) {

                        if ($scope.fastStatus != '1') {
                            Toast('请先通过基础认证');
                            return
                        }

                        if (x == '1' || x == '3') return;

                        if ($scope.realNameStatus == 0 || $scope.realNameStatus == 2) {
                            //TO REAL NAME
                            return
                        }

                        $scope.zmUrl = Verify.zmVerifyUrl().query({
                            appToken: $scope.appToken
                        });
                        $scope.$root.loading = true;
                        $scope.zmUrl.$promise.then(function (res) {
                            $scope.$root.loading = false;
                            if (res.result == 0) {
                                Toast('获取成功');
                                if (!!res.data.url) {
                                    Bridge.jumpTo(res.data.url, '芝麻信用');
                                } else {
                                    $scope.initStatus();
                                }
                            } else if (res.result == 1013) {
                                Toast(res.msg)
                            } else {
                                Toast(res.msg)
                            }
                        }).catch(function (error) {
                            $scope.$root.loading = false;
                            Toast(JSON.stringify(error))
                        });
                    };

                    $scope.goToFastVerify = function (x) {

                        if (x == '1' || x == '3') return;

                        if ($scope.realNameStatus == 0 || $scope.realNameStatus == 2) {
                            Bridge.realName();
                            return
                        }


                        if ($scope.userType == 6) {
                            Bridge.jumpTo($scope.baseUrl + '#?/verify/fast', '极速认证');
                        } else if ($scope.userType == 0) {
                            Bridge.jumpTo($scope.baseUrl + '#?/verify/fast-student', '极速认证');
                        }

                    };

                    $scope.goToBankVerify = function (x) {

                        if ($scope.fastStatus != '1' && $scope.fastStatus != '3') {
                            Toast('请先进行基础认证');
                            return
                        }

                        if (x == '1' || x == '3') return;

                        if ($scope.realNameStatus == 0 || $scope.realNameStatus == 2) {
                            Bridge.realName();
                            return
                        }

                        Bridge.jumpTo($scope.baseUrl + '#?/verify/bank', '银行流水认证');
                    };

                    $scope.goToTaobaoVerify = function (x) {

                        if ($scope.fastStatus != '1' && $scope.fastStatus != '3') {
                            Toast('请先进行基础认证');
                            return
                        }

                        if (x == '1' || x == '3') return;

                        if ($scope.realNameStatus == 0 || $scope.realNameStatus == 2) {
                            Bridge.realName();
                            return
                        }

                        Bridge.jumpTo($scope.baseUrl + '#?/verify/taobao', '电商认证');
                    }
                });

            }])
    }
});