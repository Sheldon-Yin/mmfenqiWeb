/**
 * Created by sheldon on 2016/5/27.
 */
'use strict';

define(function (require, exports, module) {
    module.exports = function (app) {
        app.register.controller('TreasureMineCtrl', ['$scope','Treasure','Bridge','$location',
            function ($scope,Treasure,Bridge,$location) {
                console.log('mine');
                $scope.baseUrl = $location.absUrl().split('#')[0];

                Bridge.appToken(function (response) {
                    $scope.appToken = response;
                    //Toast($scope.appToken)
                    $scope.initMine = function () {
                        $scope.userInfoReq = Treasure.userInfo().query({
                            appToken: $scope.appToken
                        });
                        $scope.userInfoReq.$promise.then(function (res) {
                            if (res.result == 0){
                                $scope.userInfo = res.data;
                            }else if (res.result = 1013){

                            }else {
                                Toast(res.msg)
                            }
                            $scope.goToRealName = function () {

                                if (!!$scope.userInfo && $scope.userInfo.isRealNameAuth == false){
                                    Bridge.realName();
                                }else {
                                    //Toast('无需认证或未登录')
                                }
                            }
                        }).catch(function (error) {
                            Toast(error.toString())
                        });
                    };
                    $scope.initMine();

                    console.log($scope.$parent.pageStatus);
                    $scope.$parent.$watch('pageStatus', function (newValue, oldValue) {
                        if($scope.$parent.pageStatus == 4){
                            $scope.initMine();
                        }
                    });
                });



                $scope.goToRecharge = function () {
                    Bridge.jumpTo($scope.baseUrl+'#?/treasure/recharge','优呗充值');
                };

                $scope.goToTreasureRecord = function () {
                    Bridge.jumpTo($scope.baseUrl+'#?/treasure/treasure-record','夺宝记录')
                };

                $scope.goToPrizeRecord = function () {
                    Bridge.jumpTo($scope.baseUrl + '#?/treasure/prize-record','中奖记录')
                };

                $scope.goToInvite = function () {
                    Bridge.jumpTo($scope.baseUrl + '#?/treasure/invite','分享赢优呗')
                };

                $scope.goToMyShare = function () {
                    Bridge.jumpTo($scope.baseUrl + '#?/treasure/my-share','我的晒单')
                };

                $scope.goToAddress = function () {
                    Bridge.jumpTo($scope.baseUrl + '#?/treasure/address','收货地址')
                }



            }])
    }
});
