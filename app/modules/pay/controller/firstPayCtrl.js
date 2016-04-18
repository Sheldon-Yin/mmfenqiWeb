/**
 * Created by sheldon on 2016/4/18.
 */

'use strict';

define(function (require, exports, module) {
    module.exports = function (app) {
        app.register.controller('FirstPay', ['$scope',
            function ($scope) {
                $scope.goBack = function () {
                    window.history.back(-1);
                };
            }])
    }
});