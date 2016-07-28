/**
 * Created by sheldon on 2016/5/27.
 */
'use strict';

define(function (require, exports, module) {
    module.exports = function (app) {
        require('../controller/tplCtrl/indexCtrl.js')(app);
        require('../controller/tplCtrl/mineCtrl.js')(app);
        require('../controller/tplCtrl/newCtrl.js')(app);
        require('../controller/tplCtrl/rechargeCtrl.js')(app);
        require('services/treasureService.js')(app);
        require('services/weChatService.js')(app);
        app.register.controller('TreasureCtrl', ['$scope','$location',
            function ($scope,$location) {

                var storageStatus = window.localStorage.pageStatus ? window.localStorage.pageStatus : 1;

                $scope.pageStatus = $location.search().status ? $location.search().status : storageStatus;

                $scope.$watch('pageStatus', function (newVal, oldVal) {
                    window.localStorage.pageStatus = newVal
                })

            }])
    }
});
