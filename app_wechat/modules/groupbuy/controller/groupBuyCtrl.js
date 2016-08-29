/**
 * Created by sheldon on 2016/3/22.
 */
'use strict';

/* Controllers */

define(function (require, exports, module) {
    module.exports = function (app) {
        app.register.controller('GroupBuyCtrl', ['$scope',
            function ($scope) {
                $scope.$root.title = '美眉分期';
                $scope.baseUrl = 'modules/groupbuy/';
                $scope.orderProp = 'age';
            }]);
    }
});