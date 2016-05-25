/**
 * Created by sheldon on 2016/5/20.
 */
'use strict';

define(function (require, exports, module) {
    module.exports = function (app) {
        require('services/loginService.js')(app);
        require('services/utilsService.js')(app);
        require('services/weChatService.js')(app);
        app.register.controller('ResetPasswordCtrl', ['$scope', '$location', 'Login', 'MD5', '$interval', 'WeChatTitle',
            function ($scope, $location, Login, MD5, $interval, WeChatTitle) {

                WeChatTitle('重置登录密码');

                $scope.telephone = $location.search().telephone;
                $scope.verifyText = '获取验证码';
                $scope.verifyStatus = true;

                $scope.getVerifyCode = function () {
                    if (!$scope.verifyStatus) return;
                    $scope.verifyStatus = false;

                    $scope.getVerifyCodeReq = Login.getVerifyCode().save({
                        telephone: $scope.telephone,
                        smsFmtId: 'resetPwd'
                    });
                    $scope.getVerifyCodeReq.$promise.then(function (res) {
                        if (res.result == 0) {
                            Toast('发送成功');
                            $scope.counter = 60;
                            $scope.verifyStatus = false;
                            var interval = $interval(function () {
                                $scope.verifyText = $scope.counter + 's后可再发送';
                                if ($scope.counter < 1) {
                                    $interval.cancel(interval);
                                    $scope.verifyStatus = true;
                                    $scope.verifyText = '发送验证码'
                                }
                                $scope.counter--;
                            }, 1000)
                        } else {
                            Toast(res.msg);
                            $scope.verifyStatus = true;
                        }
                        console.log(res);
                    }).catch(function (error) {
                        Toast('服务器开小差了~');
                        console.log(error);
                        $scope.verifyStatus = true;
                    })
                };

                $scope.getVerifyCode();


                $scope.resetPassword = function () {
                    $scope.resetPasswordReq = Login.resetPassword().save({
                        userName: $scope.telephone,
                        password: MD5($scope.password),
                        verifyCode: $scope.verifyCode
                    });

                    $scope.resetPasswordReq.$promise.then(function (res) {
                        if (res.result == 0) {
                            alert('重置成功');
                            $location.path('/login/telephone')
                        } else {
                            Toast(res.msg);
                        }
                        console.log(res)
                    }).catch(function (error) {
                        Toast('服务器开小差了~');
                        console.log(error)
                    })

                };

            }])
    }
});