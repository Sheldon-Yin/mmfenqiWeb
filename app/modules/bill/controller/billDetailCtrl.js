/**
 * Created by sheldon on 2016/4/25.
 */
'use strict';

define(function (require, exports, module) {
    module.exports = function (app) {
        app.register.controller('BillDetailCtrl', ['$scope',
            function ($scope) {
                $scope.goBack = function () {
                    window.history.back(-1);
                };
            }])
    }
});