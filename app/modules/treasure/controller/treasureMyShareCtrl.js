/**
 * Created by sheldon on 2016/6/6.
 */
'use strict';

define(function (require, exports, module) {
    module.exports = function (app) {
        require('services/treasureService.js')(app);
        require('services/bridgeService.js')(app);
        app.register.controller('TreasureMyShareCtrl', ['$scope','Treasure','Bridge',
            function ($scope,Treasure,Bridge) {

                Bridge.appToken(function (response) {
                    $scope.appToken = encodeURIComponent(response);
                    $scope.initShareList = function () {
                        $scope.shareListReq = Treasure.myShareList().query({
                            appToken:$scope.appToken
                        });
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
                });

            }])
    }
});