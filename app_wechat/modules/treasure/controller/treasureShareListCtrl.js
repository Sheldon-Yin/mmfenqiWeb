/**
 * Created by sheldon on 2016/6/7.
 */
'use strict';

define(function (require, exports, module) {
    module.exports = function (app) {
        require('services/treasureService.js')(app);
        require('services/weChatService.js')(app);
        app.register.controller('TreasureShareListCtrl', ['$scope','Treasure',
            function ($scope,Treasure) {



                $scope.initShareList = function () {
                    $scope.shareListReq = Treasure.shareList().query();
                    $scope.shareListReq.$promise.then(function (res) {
                        if(res.result == 0){
                            $scope.shareList = res.data.showAwards;
                        }else {
                            Toast(res.msg)
                        }
                    }).catch(function (error) {
                        Toast('服务器返回错误')
                    })
                };

                $scope.initShareList();

            }])
    }
});