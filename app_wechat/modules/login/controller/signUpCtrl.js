/**
 * Created by sheldon on 2016/5/20.
 */
'use strict';

define(function (require, exports, module) {
    module.exports = function (app) {
        require('services/loginService.js')(app);
        require('services/utilsService.js')(app);
        require('services/weChatService.js')(app);
        app.register.controller('SignUpCtrl', ['$scope', 'Login', '$location', '$interval','MD5','WeChatTitle',
            function ($scope, Login, $location, $interval,MD5,WeChatTitle) {

                WeChatTitle('注册');
                $scope.isChecked = true;
                $scope.isCheckedImg = 'modules/login/img/checked.png';
                $scope.verifyText = '获取验证码';
                $scope.verifyStatus = true;
                $scope.telephone = Number($location.search().telephone);

                $scope.getVerifyCode = function () {
                    if (!$scope.verifyStatus) return;
                    $scope.verifyStatus = false;

                    $scope.getVerifyCodeReq = Login.getVerifyCode().save({
                        telephone: $scope.telephone,
                        smsFmtId: 'register'
                    });
                    $scope.$root.loading = true;
                    $scope.getVerifyCodeReq.$promise.then(function (res) {
                        $scope.$root.loading = false;
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
                        $scope.$root.loading = false;
                        Toast('服务器开小差了~');
                        console.log(error);
                        $scope.verifyStatus = true;
                    })
                };


                $scope.register = function () {
                    $scope.regiterReq = Login.signUp().save({
                        userName: $scope.telephone,
                        password: MD5($scope.password),
                        verifyCode: $scope.verifyCode,
                        recommendedCode: $scope.recommendedCode,
                        userType: 1
                    });
                    $scope.$root.loading = true;

                    $scope.regiterReq.$promise.then(function (res) {
                        $scope.$root.loading = false;
                        if(res.result == 0){
                            alert('注册成功');
                            $location.path('login/telephone')
                        }else {
                            Toast(res.msg);
                        }
                        console.log(res)
                    }).catch(function (error) {
                        $scope.$root.loading = false;
                        Toast('服务器开小差了~');
                        console.log(error)
                    })

                };

                $scope.getVerifyCode();

                $scope.toggleChecked = function () {

                };

            }])
    }
});