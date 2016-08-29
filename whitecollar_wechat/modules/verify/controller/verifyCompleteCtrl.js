/**
 * Created by sheldon on 2016/8/3.
 */
'use strict';

define(function (require, exports, module) {
    module.exports = function (app) {
        require('services/verifyService.js')(app);
        require('services/weChatService.js')(app);
        app.register.controller('VerifyCompleteCtrl', ['$scope', 'Verify', 'WeChat','$location','WeChatTitle','Bridge',
            function ($scope, Verify, WeChat,$location,WeChatTitle,Bridge) {

                $scope.goBack = function () {
                    Bridge.goBack();
                }

            }])
    }
});