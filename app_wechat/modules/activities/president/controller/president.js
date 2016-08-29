/**
 * Created by ChinaHp on 2016/8/18.
 */
'use strict';
define(function (require, exports, module) {
    module.exports = function (app) {
        require('services/weChatService.js')(app);
        app.register.controller('PresidentCtrl', ['$scope','$http','Bridge','WeChatTitle','$location',
            function ($scope,$http,Bridge,WeChatTitle,$location) {

                $scope.goBack = function () {
                    window.history.go(-1);
                };

                $scope.showMore=false;
                $http({url:'/appinterface/query_alreadyBuy_goodsInfo_by_goodsIdList?goodsIdList=378,379,381,528',
                    method:'GET'
                }).success(function(data,header,config,status){
                    console.log(data);
                    $scope.orderList = data.data.orderList;
                    console.log($scope.orderList);
                    if ($scope.orderList.length < 11){
                        $scope.showMore = true;
                    }
                }).error(function(data,header,config,status){
                    console.log('error');
                });


                $scope.goToGoodsDetails = function (x) {

                    Bridge.jumpTo(encodeURI($location.absUrl().split('#')[0] + '#?/goods?goodsId=' + x),'产品详情');
                };


                $scope.showMoreUser = function () {
                    $scope.showMore = true;
                }

            }]);
    }
});
