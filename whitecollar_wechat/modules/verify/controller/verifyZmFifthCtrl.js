/**
 * Created by sheldon on 2016/8/3.
 */
'use strict';

define(function (require, exports, module) {
    module.exports = function (app) {
        require('services/verifyService.js')(app);
        require('services/weChatService.js')(app);
        app.register.controller('VerifyZmFifthCtrl', ['$scope', 'Verify', 'WeChat','$location','WeChatTitle','Bridge',
            function ($scope, Verify, WeChat,$location,WeChatTitle,Bridge) {

                WeChatTitle('芝麻信用');

                Bridge.appToken(function (res) {
                    $scope.appToken = res;
                });

                $scope.goToZmVerify = function (x) {

                    $scope.zmUrl = Verify.zmVerifyUrl().query({
                        appToken: $scope.appToken
                    });
                    $scope.$root.loading = true;
                    $scope.zmUrl.$promise.then(function (res) {
                        $scope.$root.loading = false;
                        if (res.result == 0) {
                            Toast('获取成功');
                            if (!!res.data.url) {
                                Bridge.jumpTo(res.data.url, '芝麻信用');
                            } else {
                                $scope.jumpToNext()
                            }
                        } else if (res.result == 1013) {
                            Toast(res.msg)
                        } else {
                            Toast(res.msg)
                        }
                    }).catch(function (error) {
                        $scope.$root.loading = false;
                        Toast(JSON.stringify(error))
                    });
                };

                $scope.jumpToNext = function () {
                    $scope.$parent.jumpToNext();
                }

            }])
    }
});
