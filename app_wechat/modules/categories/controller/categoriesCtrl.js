/**
 * Created by sheldon on 2016/4/19.
 */

'use strict';

define(function (require, exports, module) {
    module.exports = function (app) {
        require('services/categoriesService.js')(app);
        require('services/weChatService.js')(app);
        app.register.controller('CategoriesCtrl', ['$scope', 'Categories', '$location', 'Bridge',
            function ($scope, Categories, $location, Bridge) {

                $scope.categories = Categories.query();
                console.log($scope.categories);
                $scope.categories.$promise.then(function (res) {
                    if (res.result != 0) {
                        Toast(res.msg, 3000);
                        $scope.loadError = true;
                    }
                }).catch(function (error) {
                    $scope.loadError = true;
                    Toast(error);
                });

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

                $scope.jumpTo = function (x) {

                    Bridge.jumpTo(encodeURI($location.absUrl().split('#')[0] + x), '产品类别');

                }

            }])
    }
});