/**
 * Created by sheldon on 2016/4/15.
 */

'use strict';

define(function (require, exports, module) {
    module.exports = function (app) {
        require('services/queryQoutiqueListService.js')(app);
        require('services/weChatService.js')(app);
        app.register.controller('RecommendCtrl', ['$scope','Qoutique','$location','Bridge',
            function ($scope,Qoutique,$location,Bridge) {

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

                    Bridge.jumpTo(encodeURI($location.absUrl().split('#')[0] + x + '&cityName=' + $scope.cityName),'产品详情')

                };

                console.log($scope.data);
            }])
    }
});