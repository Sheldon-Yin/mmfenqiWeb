/**
 * Created by sheldon on 2016/5/27.
 */
'use strict';

define(function (require, exports, module) {
    module.exports = function (app) {
        app.register.controller('TreasureMineCtrl', ['$scope','Treasure',
            function ($scope,Treasure) {
                console.log('mine');

                console.log($scope.$parent.pageStatus);
                $scope.$parent.$watch('pageStatus', function (newValue, oldValue) {
                    if($scope.$parent.pageStatus == 4){
                        $scope.initMine();
                    }
                });

                $scope.initMine = function () {
                    $scope.userInfoReq = Treasure.userInfo().query();
                    $scope.userInfoReq.$promise.then(function (res) {
                        console.log(res);
                        if (res.result == 0){
                            $scope.userInfo = res.data;

                        }else if (res.result = 1013){

                        }else {
                            Toast(res.msg)
                        }
                        $scope.goToRealName = function () {

                            if (!!$scope.userInfo && $scope.userInfo.isRealNameAuth == false){
                                window.location.href = '/promote/toCredit'
                            }else {
                                Toast('无需认证或未登录')
                            }
                        }
                    }).catch(function (error) {
                        console.log(error)
                    });
                };

                $scope.initMine();

            }])
    }
});
