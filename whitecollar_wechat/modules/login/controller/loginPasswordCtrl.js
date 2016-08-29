/**
 * Created by sheldon on 2016/5/20.
 */
'use strict';

define(function (require, exports, module) {
    module.exports = function (app) {
        require('services/loginService.js')(app);
        require('services/utilsService.js')(app);
        require('services/weChatService.js')(app);
        app.register.controller('LoginPasswordCtrl', ['$scope', 'Login', '$location', 'MD5','WeChatTitle','Bridge',
            function ($scope, Login, $location, MD5,WeChatTitle,Bridge) {

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
                            Toast('登录成功');
                            var appToken = res.data.APP_TOKEN;
                            Bridge.saveAppToken(appToken, function (res) {
                                console.log(window.localStorage.referer);
                                var href = !!window.localStorage.referer ? window.localStorage.referer : ($location.absUrl().split('#')[0] + '#?/login/info');
                                window.location.href = is_weixn() ? ("/appinterface/webAuthorize?appToken=" + appToken + "&state=" + encodeURIComponent(href)) : href;
                            });
                            console.log(appToken)
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
                };

                function is_weixn() {
                    var ua = navigator.userAgent.toLowerCase();
                    if (ua.match(/MicroMessenger/i) == "micromessenger") {
                        return true;
                    } else {
                        return false;
                    }
                }

            }])
    }
});