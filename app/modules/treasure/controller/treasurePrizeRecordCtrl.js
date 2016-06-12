/**
 * Created by sheldon on 2016/6/6.
 */
'use strict';

define(function (require, exports, module) {
    module.exports = function (app) {
        require('services/treasureService.js')(app);
        require('services/bridgeService.js')(app);
        app.register.controller('TreasurePrizeRecordCtrl', ['$scope','Treasure','Bridge','$location',
            function ($scope,Treasure,Bridge,$location) {

                $scope.baseUrl = $location.absUrl().split('#')[0];

                Bridge.appToken(function (response) {

                    $scope.appToken = encodeURI(response);
                    $scope.initPrizeRecordList = function () {
                        $scope.myPrizeRecordListReq = Treasure.myPrizeRecordList().query({
                            appToken:$scope.appToken
                        });
                        $scope.myPrizeRecordListReq.$promise.then(function (res) {
                            if(res.result == 0){
                                $scope.prizeRecordList = res.data.luckyWinningRecords;
                            }else {
                                Toast(res.msg)
                            }
                        }).catch(function (error) {
                            Toast('服务器返回错误')
                        })
                    };
                    $scope.initPrizeRecordList();

                    $scope.goToShare = function (x) {
                        Bridge.jumpTo($scope.baseUrl+'#/treasure/share?id=' + x,'中奖晒出来')
                    }

                });
            }])
    }
});