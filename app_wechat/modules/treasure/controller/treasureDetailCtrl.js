/**
 * Created by sheldon on 2016/5/30.
 */
'use strict';

define(function (require, exports, module) {
    module.exports = function (app) {
        require('services/weChatService.js')(app);
        require('services/treasureService.js')(app);
        app.register.controller('TreasureDetailCtrl', ['$scope', 'WeChatTitle', '$location', 'Treasure',
            function ($scope, WeChatTitle, $location, Treasure) {

                WeChatTitle('宝物详情');
                $scope.isDialogShow = false;
                $scope.buyNumber = 1;

                $scope.initTreasureDetail = function () {
                    $scope.treasureDetailReq = Treasure.treasureDetail().query({
                        id: $location.search().id
                    });
                    $scope.treasureDetailReq.$promise.then(function (res) {
                        console.log(res);
                        if (res.result == 0){
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
                                if (x==-1){
                                    $scope.buyNumber = $scope.treasureDetail.lastVisitors;
                                    return
                                }

                                if (x>$scope.treasureDetail.lastVisitors){
                                    $scope.buyNumber = lastVisitors;
                                }else {
                                    $scope.buyNumber = x
                                }
                            };

                            $scope.goToBuy = function () {
                                window.location.href = ('/duobao/toPay?id='+$location.search().id+'&amount='+$scope.buyNumber+'&buyType=1'+'&count='+$scope.buyNumber)
                            };

                            $scope.goToPicDetail = function () {
                                window.location.href = '/duobao/toGoodsDetail/'+$scope.luckyGoodsId;
                            };

                            $scope.lastWinnerReq = Treasure.lastWinner().query({
                                luckyGoodsId: $scope.luckyGoodsId
                            });
                            $scope.lastWinnerReq.$promise.then(function (res) {
                                console.log(res);
                                if (res.result == 0){
                                    $scope.isWinnerExist = res.data.pastWinnerRecord.length > 0 ;
                                    $scope.lastWinner = res.data.pastWinnerRecord[0];
                                }else {
                                    console.log(res.msg)
                                }
                            }).catch(function (error) {
                                console.log(error)
                            });
                        }else {
                            Toast(res.msg)
                        }
                    }).catch(function (error) {
                        console.log(error)
                    });

                    $scope.honorRollReq = Treasure.honorRoll().query({
                        id:$location.search().id
                    });
                    $scope.honorRollReq.$promise.then(function (res) {
                        console.log(res);
                        if(res.result == 0){
                            $scope.honorRoll = res.data;
                        }else {
                            Toast(res.msg)
                        }
                    }).catch(function (error) {
                        console.log(error)
                    })

                };

                $scope.initTreasureDetail();


                $scope.backHome = function () {
                    $location.path('/treasure')
                };

                $scope.backTop = function () {
                    var timer = setInterval(function () {

                        window.scrollBy(0, -100);

                        if (document.documentElement.scrollTop == 0 && document.body.scrollTop == 0)

                            clearInterval(timer);

                    }, 10);
                };

                $scope.backTop();

            }])
    }
});
