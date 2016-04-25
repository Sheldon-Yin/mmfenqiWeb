/**
 * Created by sheldon on 2016/4/19.
 */

'use strict';

define(function (require, exports, module) {
    module.exports = function (app) {
        require('services/categoriesService.js')(app);
        app.register.controller('CategoriesCtrl', ['$scope','Categories',
            function ($scope,Categories) {

                $scope.categories = Categories.query();
                console.log($scope.categories);

                $scope.goBack = function () {
                    window.history.back(-1);
                };

                $scope.nowProject = '全部类目';
                $scope.filterProject = '';

                $scope.setItems = function (project) {
                    $scope.nowProject = project;
                    $scope.filterProject = project;
                    $scope.selectState = 0;
                };

                $scope.setAll = function () {
                    $scope.filterProject = '';
                    $scope.nowProject = '全部类目';
                    $scope.selectState = 0;
                };

                $scope.jumpTo = function(x) {
                    window.location.href = encodeURI(x);
                }

            }])
    }
});