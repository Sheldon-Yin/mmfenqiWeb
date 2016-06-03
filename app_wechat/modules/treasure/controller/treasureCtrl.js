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
        require('services/weChatService.js')(app);
        require('services/treasureService.js')(app);
        app.register.controller('TreasureCtrl', ['$scope','WeChatTitle','$location',
            function ($scope,WeChatTitle,$location) {

                $scope.pageStatus = $location.search().status ? $location.search().status : 1;

                $scope.$watch('pageStatus', function(newValue, oldValue) {
                    switch (Number(newValue)){
                        case 1:
                            WeChatTitle('一元夺宝');
                            break;
                        case 2:
                            WeChatTitle('最新揭晓');
                            break;
                        case 3:
                            WeChatTitle('我要充值');
                            break;
                        case 4:
                            WeChatTitle('我的夺宝');
                            break;
                        default:
                            WeChatTitle('美眉分期');
                    }
                });

            }])
    }
});
