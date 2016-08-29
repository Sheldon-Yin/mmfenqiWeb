/**
 * Created by ChinaHp on 2016/6/21.
 */
angular.module('app').directive('paginationss', function () {
    return {
        restrict: 'E',
        scope: {
            maxSize: '=',
            numPages: '=',
            currentPage: '=',
            onSelectPage: '&'
        },
        template: '<div class="btn_one_share_pagination"><ul class="pagination"><li ng-class="{disabled: noPrevious()}"><a ng-click="selectPrevious()">Previous</a></li><li ng-repeat="page in pages" ng-class="{active: isActive(page)}"><a ng-click="selectPage(page)">{{page}}</a></li><li ng-class="{disabled: noNext()}"><a ng-click="selectNext()">Next</a></li></ul></div>',
        replace: true,
        link: function (scope) {
            scope.$watch('numPages', function (value) {
                scope.pages = [];
                for (var i = 1; i <= value; i++) {
                    scope.pages.push(i);
                }
                if (scope.currentPage > value) {
                    scope.selectPage(value);
                }
            });
            scope.noPrevious = function () {
                return scope.currentPage === 1;
            };
            scope.noNext = function () {
                return scope.currentPage === scope.numPages;
            };
            scope.isActive = function (page) {
                return scope.currentPage === page;
            };

            scope.selectPage = function (page) {
                if (!scope.isActive(page)) {
                    scope.currentPage = page;
                    scope.onSelectPage({page: page});
                }
            };

            scope.selectPrevious = function () {
                if (!scope.noPrevious()) {
                    scope.selectPage(scope.currentPage - 1);
                }
            };
            scope.selectNext = function () {
                if (!scope.noNext()) {
                    scope.selectPage(scope.currentPage + 1);
                }
            };
        }
    };
});