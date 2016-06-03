/**
 * Created by sheldon on 2016/6/3.
 */
'use strict';

define(function (require, exports, module) {
    module.exports = function (app) {
        require('services/weChatService.js')(app);
        require('services/treasureService.js')(app);
        app.register.controller('TreasureLocationDetailCtrl', ['$scope','WeChatTitle',
            function ($scope,WeChatTitle) {

                WeChatTitle('地址详情');

            }])
    }
});