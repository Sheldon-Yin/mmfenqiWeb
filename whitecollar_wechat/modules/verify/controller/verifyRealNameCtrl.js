/**
 * Created by sheldon on 2016/5/23.
 */
'use strict';

define(function (require, exports, module) {
    module.exports = function (app) {
        require('services/verifyService.js')(app);
        require('services/weChatService.js')(app);
        app.register.controller('VerifyRealNameCtrl', ['$scope','Verify','$location','WeChatTitle','Bridge',
            function ($scope,Verify,$location,WeChatTitle,Bridge) {
                WeChatTitle('实名认证');
                console.log(window.localStorage.referer);
                Bridge.appToken(function (response) {
                    $scope.appToken = response;
                    $scope.verifyRealName = function () {
                        $scope.verifyRealNameReq = Verify.verifyRealName().save({
                            userName: $scope.userName,
                            identitycode: $scope.identitycode,
                            imgCode: $scope.imgCode,
                            appToken: $scope.appToken
                        });
                        $scope.$root.loading = true;
                        $scope.verifyRealNameReq.$promise.then(function (res) {
                            $scope.$root.loading = false;
                            if (res.result == 0){
                                Toast('认证成功');
                                Bridge.jumpTo(window.localStorage.referer)
                            }else if (res.result == 1013){
                                Bridge.login();
                            }else {
                                Toast(res.msg)
                            }
                            console.log(res)
                        }).catch(function (error) {
                            $scope.$root.loading = false;
                            console.log(error)
                        });
                    };
                });

                $scope.getImgVerifyCode = function () {
                    var date = new Date();
                    var timestamp = Date.parse(date);
                    document.getElementById('verifyCodeImg').src = '/appinterface/image?t='+timestamp;
                };

            }])
    }
});