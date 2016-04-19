/**
 * Created by sheldon on 2016/4/19.
 */
'use strict';

define(function (require, exports, module) {
    module.exports = function (app) {
        app.register.controller('OrderDetailCtrl', ['$scope',
            function ($scope) {
                $scope.goBack = function () {
                    window.history.back(-1);
                };

            }])
    }
});