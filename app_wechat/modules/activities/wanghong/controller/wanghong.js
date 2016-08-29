/**
 * Created by sheldon on 2016/8/15.
 */
'use strict';


/* Controllers */

define(function (require, exports, module) {
    module.exports = function (app) {
        require('services/weChatService.js')(app);
        app.register.controller('WanghongCtrl', ['$scope','$http','Bridge','$location',
            function ($scope,$http,Bridge,$location) {

                $scope.showMore = false;

                $scope.goBack = function () {
                    window.history.go(-1);
                };
                $scope.goods = 123;
                $http({
                    url:'/appinterface/query_netRedPack',
                    method:'GET'
                }).success(function(data,header,config,status){
                    console.log(data);
                    $scope.goods = data.data.goodsMapList;
                    console.log($scope.goods);
                    $scope.messages = data.data.orderList;
                }).error(function(data,header,config,status){
                    console.log('error');
                });


                $scope.goToGoodsDetails = function (x) {
                    Bridge.jumpTo(encodeURI($location.absUrl().split('#')[0] + '#?/goods?goodsId=' + x,'产品详情'));
                };

                $scope.showMoreUser = function () {
                    $scope.showMore = true;
                }



            }]);
    }
});
