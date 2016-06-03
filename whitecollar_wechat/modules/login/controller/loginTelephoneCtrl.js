/**
 * Created by sheldon on 2016/5/20.
 */
'use strict';

define(function (require, exports, module) {
    module.exports = function (app) {
        require('services/loginService.js')(app);
        require('services/weChatService.js')(app);
        app.register.controller('LoginTelephoneCtrl', ['$scope', 'Login', '$location','WeChatTitle',
            function ($scope, Login, $location,WeChatTitle) {

                WeChatTitle('手机号');

                $scope.$root.loading = false;

                $scope.telephone = Number($location.search().telephone);

                $scope.goToPasswordOrRegister = function () {

                    if ($scope.telephone == undefined) {
                        Toast('请输入正确的手机号');
                        return
                    }

                    $scope.userIsExist = Login.isExist().save({
                        telephone: $scope.telephone
                    });
                    $scope.$root.loading = true;

                    $scope.userIsExist.$promise.then(function (res) {
                        $scope.$root.loading = false;
                        console.log(res);
                        if (res.result == 0) {
                            switch (res.data.telephone_exist) {
                                case true:
                                    $location.url('/login/password?telephone=' + $scope.telephone + '&referer=' + $location.search().referer);
                                    break;
                                case false:
                                    $location.url('/login/signUp?telephone=' + $scope.telephone + '&referer=' + $location.search().referer);
                                    break;
                                default:
                                    Toast('从服务器返回了奇怪的数据')
                            }
                        } else {
                            Toast(res.message);
                        }
                    }).catch(function (error) {
                        console.log(error);
                        Toast('服务器开小差了~');
                        $scope.$root.loading = false;
                    });
                };

                $scope.goToFastLogin = function () {
                    $location.url('/login/fast?telephone=' + $scope.telephone + '&referer=' + $location.search().referer)
                }

            }])
    }
});