/**
 * Created by sheldon on 2016/5/23.
 */
'use strict';

define(function (require, exports, module) {
    module.exports = function (app) {
        require('services/verifyService.js')(app);
        require('services/bridgeService.js')(app);
        app.register.controller('VerifyTaobaoCtrl', ['$scope', 'Verify', '$location', 'Bridge',
            function ($scope, Verify, $location, Bridge) {

                $scope.type = 0;
                $scope.codeTips = '重新发送';

                $scope.setType = function (x) {
                    $scope.type = x;
                };

                Bridge.appToken(function (response) {

                    $scope.appToken = response;
                    $scope.verifyTaobao = function () {
                        $scope.verifyTaobaoReq = Verify.verifyBusiness().save({
                            account: $scope.account,
                            password: $scope.password,
                            type: $scope.type,
                            appToken: $scope.appToken,
                            requestType: 'INIT'
                        });
                        $scope.$root.loading = true;
                        $scope.verifyTaobaoReq.$promise.then(function (res) {
                            $scope.$root.loading = false;
                            if (res.result == 0) {
                                Bridge.goBack();
                            } else if (res.result == 40006) {
                                Toast('需要动态密码');
                                $scope.popVerifyCode();
                                $scope.countTips();
                            } else {
                                Toast(res.msg)
                            }
                            console.log(res)
                        }).catch(function (error) {
                            $scope.$root.loading = false;
                            Toast(JSON.stringify(error))
                        });
                    };

                    $scope.goToVerifyWithCode = function () {

                        $scope.verifyTaobaoReq = Verify.verifyBusiness().save({
                            account: $scope.account,
                            password: $scope.password,
                            type: $scope.type,
                            appToken: $scope.appToken,
                            requestType: 'SUBMIT_CAPTCHA',
                            captcha: $scope.verifyCode
                        });

                        $scope.verifyTaobaoReq.$promise.then(function (res) {
                            $scope.$root.loading = false;
                            if (res.result == 0) {
                                Bridge.goBack();
                            } else if (res.result == 40006) {
                                Toast('需要动态密码');
                                $scope.popVerifyCode();
                                $scope.countTips();
                            } else {
                                Toast(res.msg)
                            }
                            console.log(res)
                        }).catch(function (error) {
                            $scope.$root.loading = false;
                            console.log(error)
                        });

                    };

                    $scope.reSendVerifyCode = function () {

                        if ($scope.codeUnabled == true){
                            return
                        }

                        $scope.codeUnabled = true;
                        $scope.verifyTaobaoReq = Verify.verifyBusiness().save({
                            account: $scope.account,
                            password: $scope.password,
                            type: $scope.type,
                            appToken: $scope.appToken,
                            requestType: 'RESEND_CAPTCHA'
                        });
                        $scope.verifyTaobaoReq.$promise.then(function (res) {
                            if (res.result == 0) {
                                $scope.countTips();
                            } else {
                                $scope.codeUnabled = false;
                                Toast(res.msg)
                            }
                        }).catch(function (error) {
                            $scope.codeUnabled = false;
                            Toast(error)
                        })
                    };

                    $scope.popVerifyCode = function () {
                        $scope.showVerify = true
                    }

                });

                $scope.hideVerifyCode = function () {
                    $scope.showVerify = false;
                    console.log($scope.showVerify)
                };

                $scope.countTips = function () {
                    $scope.codeTips = 60;
                    var si = setInterval(function () {
                        $scope.$apply(function () {
                            $scope.codeTips--;
                        });
                        if ($scope.codeTips < 1) {
                            clearTimeout(si);
                            $scope.$apply(function () {
                                $scope.codeTips = '重新发送';
                                $scope.codeUnabled = false;
                            });
                        }
                    }, 1000);
                };

            }])
    }
});