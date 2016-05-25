/**
 * Created by sheldon on 2016/5/23.
 */
'use strict';

define(function (require, exports, module) {
    module.exports = function (app) {
        require('services/verifyService.js')(app);
        require('services/weChatService.js')(app);
        app.register.controller('VerifyRealNameCtrl', ['$scope','Verify','$location','WeChatTitle',
            function ($scope,Verify,$location,WeChatTitle) {
                WeChatTitle('实名认证');
                $scope.verifyRealName = function () {
                    $scope.verifyRealNameReq = Verify.verifyRealName().save({
                        userName: $scope.userName,
                        identitycode: $scope.identitycode,
                        imgCode: $scope.imgCode
                    });
                    $scope.verifyRealNameReq.$promise.then(function (res) {
                        if (res.result == 0){
                            $location.path('/verify/index')
                        }else if (res.result == 1013){
                            window.location.href = './#/login/telephone?referer='+ encodeURI('./#/verify/index');
                        }else {
                            Toast(res.msg)
                        }
                        console.log(res)
                    }).catch(function (error) {
                        console.log(error)
                    });
                };


                $scope.getImgVerifyCode = function () {
                    var date = new Date();
                    var timestamp = Date.parse(date);
                    document.getElementById('verifyCodeImg').src = '/appinterface/image?t='+timestamp;
                };

            }])
    }
});