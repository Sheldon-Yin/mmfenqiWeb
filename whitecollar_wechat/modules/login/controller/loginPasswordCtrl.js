/**
 * Created by sheldon on 2016/5/20.
 */
'use strict';

define(function (require, exports, module) {
    module.exports = function (app) {
        require('services/loginService.js')(app);
        require('services/utilsService.js')(app);
        require('services/weChatService.js')(app);
        app.register.controller('LoginPasswordCtrl', ['$scope', 'Login', '$location', 'MD5','WeChatTitle',
            function ($scope, Login, $location, MD5,WeChatTitle) {

                WeChatTitle('登录');
                $scope.telephone = Number($location.search().telephone);

                console.log(1);

                $scope.goToResetPassword = function () {
                    $location.path('/login/reset');
                };

                $scope.Login = function () {
                    $scope.login = Login.login().save({
                        userName: $scope.telephone,
                        password: MD5($scope.password)
                    });
                    $scope.$root.loading = true;
                    $scope.login.$promise.then(function (res) {
                        if(res.result == 0){
                            $scope.referer = res.data.referer;
                            Toast('登录成功');
                            window.location.href = (!!$scope.referer && $scope.referer != undefined && $scope.referer != 'undefined' && $scope.referer != null) ? decodeURI($scope.referer) : '/index';
                        }else {
                            Toast(res.msg);
                        }
                        console.log(res);
                        $scope.$root.loading = false;
                    }).catch(function (error) {
                        Toast('服务器开小差了~');
                        console.log(error);
                        $scope.$root.loading = false;
                    })
                }

            }])
    }
});