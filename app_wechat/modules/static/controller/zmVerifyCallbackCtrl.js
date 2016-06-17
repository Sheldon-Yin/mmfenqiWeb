//2016.06.14
'use strict';

define(function (require, exports, module) {
    module.exports = function (app) {
        require('services/bridgeService.js')(app);
        app.register.controller('ZmVerifyCallbackCtrl', ['$scope','$location','Bridge',
            function ($scope,$location,Bridge) {

                setTimeout(function () {
                    window.location.href = '/static/whitecollar_wechat/#/verify/index'
                },3000);

                Bridge.goBack();

            }])
    }
});