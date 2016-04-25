/**
 * Created by sheldon on 2016/4/25.
 */
'use strict';

define(function (require, exports, module) {
    module.exports = function (app) {
        app.register.controller('BillRecordCtrl', ['$scope',
            function ($scope) {
                $scope.goBack = function () {
                    window.history.back(-1);
                };

                $scope.showHiddenList = [0];

                $scope.toggleShowHide = function (id) {
                    if (!$scope.showHiddenList[id]){
                        $scope.showHiddenList[id] = 0;
                    }
                    $scope.showHiddenList[id] = !$scope.showHiddenList[id];
                }

            }])
    }
});