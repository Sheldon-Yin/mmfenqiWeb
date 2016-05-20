/**
 * Created by sheldon on 2016/5/20.
 */
'use strict';

define(function (require, exports, module) {
    module.exports = function (app) {
        require('services/loginService.js')(app);
        require('services/utilsService.js')(app);
        app.register.controller('LoginPasswordCtrl', ['$scope', 'Login', '$location', 'MD5',
            function ($scope, Login, $location, MD5) {
                $scope.$root.title = '登录';
                $scope.telephone = Number($location.search().telephone);

                console.log(1);

                $scope.goToResetPassword = function () {
                    $location.url('/login/reset?telephone=' + $scope.telephone);
                };

                $scope.Login = function () {
                    $scope.login = Login.login().save({
                        userName: $scope.telephone,
                        password: MD5($scope.password)
                    });
                    $scope.login.$promise.then(function (res) {
                        if(res.result == 0){
                            alert('登录成功')
                        }else {
                            Toast(res.msg);
                        }
                        console.log(res)
                    }).catch(function (error) {
                        Toast('服务器开小差了~');
                        console.log(error)
                    })
                }

            }])
    }
});