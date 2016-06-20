/**
 * Created by sheldon on 2016/5/30.
 */
'use strict';

define(function (require, exports, module) {
    module.exports = function (app) {
        require('services/treasureService.js')(app);
        require('services/bridgeService.js')(app);
        app.register.controller('TreasureRecordDetailCtrl', ['$scope', '$location', 'Treasure', 'Bridge',
            function ($scope, $location, Treasure, Bridge) {

                $scope.baseUrl = $location.absUrl().split('#')[0];

                $scope.isDialogShow = false;
                $scope.buyNumber = 0;

                Bridge.appToken(function (response) {
                    $scope.appToken = response;

                    $scope.initTreasureDetail = function () {
                        $scope.treasureDetailReq = Treasure.recordDetail().query({
                            id: $location.search().id,
                            appToken: $scope.appToken
                        });
                        $scope.treasureDetailReq.$promise.then(function (res) {
                            console.log(res);
                            if (res.result == 0) {
                                $scope.treasureDetail = res.data.luckysweep;
                                $scope.recordList = res.data.luckyIndianaTimes;
                                $scope.luckyGoodsId = res.data.luckysweep.luckyGoodsId;

                                $scope.showDialog = function () {
                                    $scope.isDialogShow = true;
                                };

                                $scope.closeDialog = function () {
                                    $scope.isDialogShow = false;
                                };

                                $scope.buyNumberChoose = function (x) {
                                    if (x == -1) {
                                        $scope.buyNumber = $scope.treasureDetail.lastVisitors;
                                        return
                                    }

                                    if (x > $scope.treasureDetail.lastVisitors) {
                                        $scope.buyNumber = $scope.treasureDetail.lastVisitors;
                                    } else {
                                        $scope.buyNumber = x
                                    }
                                };

                                $scope.goToBuy = function () {
                                    if ($scope.buyNumber < 1){
                                        Toast('至少购买一人份的夺宝机会');
                                        return
                                    }
                                    Bridge.jumpTo($scope.baseUrl + '#/treasure/pay-way?id='+$location.search().id+'&count='+$scope.buyNumber,'支付')
                                };

                                $scope.goToPicDetail = function () {
                                    Bridge.jumpTo('http://www.mmfenqi.com/duobao/toGoodsDetail/' + $scope.luckyGoodsId, '图文详情');
                                };

                                $scope.lastWinnerReq = Treasure.lastWinner().query({
                                    luckyGoodsId: $scope.luckyGoodsId
                                });
                                $scope.lastWinnerReq.$promise.then(function (res) {
                                    console.log(res);
                                    if (res.result == 0) {
                                        $scope.isWinnerExist = res.data.pastWinnerRecord.length > 0;
                                        $scope.lastWinner = res.data.pastWinnerRecord[0];
                                    } else {
                                        console.log(res.msg)
                                    }
                                }).catch(function (error) {
                                    console.log(error)
                                });
                            } else {
                                Toast(res.msg)
                            }
                        }).catch(function (error) {
                            console.log(error)
                        });

                        $scope.honorRollReq = Treasure.honorRoll().query({
                            id: $location.search().id
                        });
                        $scope.honorRollReq.$promise.then(function (res) {
                            console.log(res);
                            if (res.result == 0) {
                                $scope.honorRoll = res.data;
                            } else {
                                Toast(res.msg)
                            }
                        }).catch(function (error) {
                            console.log(error)
                        })

                    };

                    $scope.initTreasureDetail();

                });


                $scope.backHome = function () {
                    Bridge.goBack();
                };

                $scope.backTop = function () {
                    var timer = setInterval(function () {

                        window.scrollBy(0, -100);

                        if (document.documentElement.scrollTop < 1 && document.body.scrollTop < 1)

                            clearInterval(timer);

                    }, 10);
                };


            }])
    }
});
