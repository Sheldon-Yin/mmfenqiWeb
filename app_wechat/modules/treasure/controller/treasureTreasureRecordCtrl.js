/**
 * Created by sheldon on 2016/6/6.
 */
'use strict';

define(function (require, exports, module) {
    module.exports = function (app) {
        require('services/treasureService.js')(app);
        require('services/weChatService.js')(app);
        app.register.controller('TreasureTreasureRecordCtrl', ['$scope','Treasure','Bridge','$location',
            function ($scope,Treasure,Bridge,$location) {

                $scope.baseUrl = $location.absUrl().split('#')[0];

                Bridge.appToken(function (response) {

                    $scope.appToken = response;
                    $scope.initTreasureRecordList = function () {
                        $scope.myTreasureRecordListReq = Treasure.myTreasureRecordList().query({
                            appToken:$scope.appToken
                        });
                        $scope.myTreasureRecordListReq.$promise.then(function (res) {
                            if(res.result == 0){
                                $scope.treasureRecordList = res.data.luckysweepstakes;
                            }else {
                                Toast(res.msg)
                            }
                        }).catch(function (error) {
                            Toast('服务器返回错误')
                        })
                    };
                    $scope.initTreasureRecordList();
                    
                    $scope.goToDetail = function (x) {
                        Bridge.jumpTo($scope.baseUrl+'#?/treasure/record/detail?id=' + x.id)
                    }

                });

            }])
    }
});