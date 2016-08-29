/**
 * Created by sheldon on 2016/8/23.
 */
'use strict';


/* Controllers */

define(function (require, exports, module) {
    module.exports = function (app) {
        require('services/weChatService.js')(app);
        app.register.controller('ActivityCtrl', ['$scope','$http','$location','Bridge',
            function ($scope,$http,$location,Bridge) {

                $scope.goBack = function () {
                    window.history.go(-1);
                };

                console.log($location.search().index);

                $http({
                    url:'/appinterface/queryGoods_activity_number?index=' + $location.search().index,
                    method:'GET'
                }).success(function(data,header,config,status){
                    $scope.data = data.data;
                    console.log($scope.data);
                }).error(function(data,header,config,status){
                    console.log('error');
                });


                $scope.goToDetails = function (x) {
                    Bridge.jumpTo(encodeURI($location.absUrl().split('#')[0] + '#?/goods?goodsId=' + x), '产品详情')
                }

            }]);
    }
});
