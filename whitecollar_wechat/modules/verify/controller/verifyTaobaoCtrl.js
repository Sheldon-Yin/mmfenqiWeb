/**
 * Created by sheldon on 2016/5/23.
 */
'use strict';

define(function (require, exports, module) {
    module.exports = function (app) {
        require('services/verifyService.js')(app);
        require('services/weChatService.js')(app);
        app.register.controller('VerifyTaobaoCtrl', ['$scope','Verify','$location','WeChatTitle',
            function ($scope,Verify,$location,WeChatTitle) {
                WeChatTitle('电商认证');

                $scope.verifyTaobao = function () {
                    $scope.verifyTaobaoReq = Verify.verifyBusiness().save({
                        account: $scope.account,
                        password: $scope.password
                    });
                    $scope.verifyTaobaoReq.$promise.then(function (res) {
                        if (res.result == 0){
                                $location.path('/verify/index')
                        }else if (res.result == 1013){
                            window.location.href = './#/login/telephone?referer='+ encodeURI('./#/verify/index');
                        } else {
                            Toast(res.msg)
                        }
                        console.log(res)
                    }).catch(function (error) {
                        console.log(error)
                    });
                }
            }])
    }
});