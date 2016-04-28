/**
 * Created by sheldon on 2016/4/15.
 */

'use strict';

define(function (require, exports, module) {
    module.exports = function (app) {
        require('services/queryQoutiqueListService.js')(app);
        app.register.controller('RecommendCtrl', ['$scope','Qoutique',
            function ($scope,Qoutique) {
                $scope.goBack = function () {
                    window.history.go(-1);
                };

                $scope.data = Qoutique.query({
                    isBoutique:true
                });

                $scope.jumpToGoods = function (x) {
                    window.location.href = '#/goods?goodsId='+ x.goodsHerf;
                };

                console.log($scope.data);
            }])
    }
});