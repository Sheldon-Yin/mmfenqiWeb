/**
 * Created by sheldon on 2016/4/15.
 */

'use strict';

define(function (require, exports, module) {
    module.exports = function (app) {
        require('services/queryQoutiqueListService.js')(app);
        app.register.controller('RecommendCtrl', ['$scope','Qoutique','$location',
            function ($scope,Qoutique,$location) {
                //$scope.goBack = function () {
                //    window.history.go(-1);
                //};

                $scope.data = Qoutique.query({
                    isBoutique:true
                });
                $scope.data.$promise.then(function (res) {
                    if (res.result != 0){
                        Toast(res.msg,3000);
                        $scope.loadError = true;
                    }
                }).catch(function(error){
                    $scope.loadError = true;
                });

                console.log($scope.data);

                $scope.jumpToGoods = function (x) {
                    if (myBridge) {
                        var jumpUrl = encodeURI($location.absUrl().split('#')[0] + x + '&cityName=' + $scope.cityName);
                        myBridge.callHandler('sendMessageToApp', {
                            type: 2, data: {
                                url: jumpUrl,
                                title: '商品详情',
                                leftNavItems: [1],
                                rightNavItems: [0]
                            }
                        }, function (response) {
                            //todo custom
                        });
                    }
                };

                console.log($scope.data);
            }])
    }
});