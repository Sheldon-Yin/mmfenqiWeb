/**
 * Created by sheldon on 2016/5/23.
 */
'use strict';

define(function (require, exports, module) {
    module.exports = function (app) {
        require('services/verifyService.js')(app);
        require('services/weChatService.js')(app);
        app.register.controller('VerifyIndexCtrl', ['$scope', '$location', 'Verify','WeChatTitle',
            function ($scope, $location, Verify,WeChatTitle) {

                WeChatTitle('我的信用额度');


                $scope.isRealName = Verify.isRealName().query();
                $scope.isRealName.$promise.then(function (res) {
                    if (res.result == 0) {
                        $scope.realNameStatus = res.data.isIdentityAuth;
                    } else if(res.result == 1013){
                        window.location.href = './#/login/telephone?referer='+ encodeURI('./#/verify/index');
                    }else {
                        Toast(res.msg)
                    }
                    console.log(res)
                }).catch(function (error) {
                    console.log(error)
                });

                $scope.queryVerifyStatus = Verify.queryVerifyStatus().query();
                $scope.queryVerifyStatus.$promise.then(function (res) {
                    if (res.result == 0) {
                        $scope.zmStatus = res.data.zmCredit.creditStatus;
                        $scope.businessStatus = res.data.onlineRetailersCredit.creditStatus;
                        $scope.bankStatus = res.data.bankStatementCredit.creditStatus;
                        $scope.fastStatus = res.data.fastCredit.creditStatus;
                        $scope.realLoanMoney = res.data.realloanmoney;
                        $scope.availableMoney = res.data.availableMoney;
                    } else if (res.result == 1013){
                        window.location.href = './#/login/telephone?referer='+ encodeURI('./#/verify/index');
                    } else {
                        Toast(res.msg)
                    }
                    console.log(res)
                }).catch(function (error) {
                    console.log(error)
                });

                $scope.goToZmVerify = function (x) {

                    if (x == '1' || x == '3') return;

                    if ($scope.realNameStatus == 0 || $scope.realNameStatus == 2) {
                        $location.path('/verify/real-name');
                        return
                    }

                    $scope.zmUrl = Verify.zmVerifyUrl().save();
                    $scope.zmUrl.$promise.then(function (res) {
                        if (res.result == 0) {
                            window.location.href = res.data.url;
                        } else if(res.result == 1013){
                            window.location.href = './#/login/telephone?referer='+ encodeURI('./#/verify/index');
                        }else {
                            Toast(res.msg)
                        }
                        console.log(res)
                    }).catch(function (error) {
                        console.log(error)
                    });
                };

                $scope.goToFastVerify = function (x) {

                    if (x == '1' || x == '3') return;

                    if ($scope.realNameStatus == 0 || $scope.realNameStatus == 2) {
                        $location.path('/verify/real-name');
                        return
                    }

                    $location.path('/verify/fast')
                };

                $scope.goToBankVerify = function (x) {

                    if (x == '1' || x == '3') return;

                    if ($scope.realNameStatus == 0 || $scope.realNameStatus == 2) {
                        $location.path('/verify/real-name');
                        return
                    }

                    $location.path('/verify/bank')
                };

                $scope.goToTaobaoVerify = function (x) {

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