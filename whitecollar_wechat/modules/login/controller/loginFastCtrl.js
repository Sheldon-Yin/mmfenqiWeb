/**
 * Created by sheldon on 2016/5/20.
 */
'use strict';

define(function (require, exports, module) {
    module.exports = function (app) {
        require('services/loginService.js')(app);
        require('services/weChatService.js')(app);
        app.register.controller('LoginFastCtrl', ['$scope','Login','$interval','$location','WeChatTitle',
            function ($scope,Login,$interval,$location,WeChatTitle) {

                WeChatTitle('快捷登录');

                $scope.telephone = ($location.search().telephone != 'undefined' && $location.search().telephone != undefined) ? Number($location.search().telephone) : '';
                $scope.verifyText = '获取验证码';
                $scope.verifyStatus = true;

                $scope.getVerifyCode = function () {

                    if(!$scope.verifyStatus) return;
                    $scope.verifyStatus = false;

                    if($scope.telephone == undefined){
                        alert('请输入正确的手机号');
                        return
                    }

                    $scope.getVerifyCodeReq = Login.getVerifyCode().save({
                        telephone: $scope.telephone,
                        smsFmtId : 'login'
                    });
                    $scope.$root.loading = true;
                    $scope.getVerifyCodeReq.$promise.then(function (res) {
                        $scope.$root.loading = false;
                        if (res.result == 0) {
                            Toast('发送成功');
                            $scope.counter = 60;
                            $scope.verifyStatus = false;
                            var interval = $interval(function () {
                                $scope.verifyText = $scope.counter+'s后可再发送';
                                if($scope.counter < 1) {
                                    $interval.cancel(interval);
                                    $scope.verifyStatus = true;
                                    $scope.verifyText = '发送验证码'
                                }
                                $scope.counter --;
                            },1000)
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

                $scope.Login = function () {
                    $scope.login = Login.fastLogin().save({
                        userName: $scope.telephone,
                        userType: 1,
                        verifyCode: $scope.verifyCode,
                        recommendedCode: $scope.recommendedCode
                    });
                    $scope.$root.loading = true;
                    $scope.login.$promise.then(function (res) {
                        $scope.$root.loading = false;
                        if(res.result == 0){
                            $scope.referer = res.data.referer;
                            window.localStorage.appToken = res.data.APP_TOKEN;
                            Toast('登录成功');
                            window.location.href = (!!$scope.referer && $scope.referer != undefined && $scope.referer != 'undefined' && $scope.referer != null) ? decodeURI($scope.referer) : '/index';
                        }else {
                            Toast(res.msg);
                        }
                        console.log(res)
                    }).catch(function (error) {
                        $scope.$root.loading = false;
                        Toast('服务器开小差了~');
                        console.log(error)
                    })
                }
            }])
    }
});