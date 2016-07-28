/**
 * Created by sheldon on 2016/6/23.
 */
'use strict';

define(function (require, exports, module) {
    module.exports = function (app) {
        require('services/weChatService.js')(app);
        app.register.controller('SettingCtrl', ['$scope', 'Bridge', '$location',
            function ($scope, Bridge, $location) {

                $scope.callMmfq = function () {
                    window.location.href = 'tel://' + '400-711-8898';
                };

                $scope.logOut = function () {
                    Bridge.logOut();
                    console.log('你已经成功退出');
                    Toast('你已经成功退出~');
                    window.localStorage.appStatus = 1;
                    Bridge.jumpTo(encodeURI($location.absUrl().split('#')[0]), '美眉分期');
                }

            }])
    }
});