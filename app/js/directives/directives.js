/* Directives */
define(function (require, exports, module) {
    'use strict';
    //console.log('directive');
    module.exports = function(app){
        app.directive('onFinishRenderFilters', function ($timeout) {
                return {
                    restrict: 'A',
                    link: function(scope, element, attr) {
                        if (scope.$last === true) {
                            $timeout(function() {
                                scope.$emit('ngRepeatFinished');
                            });
                        }
                    }
                };
            });
        app.directive('onFinishRenderFiltersCopy', function ($timeout) {
            return {
                restrict: 'A',
                link: function(scope, element, attr) {
                    if (scope.$last === true) {
                        $timeout(function() {
                            scope.$emit('ngRepeatFinishedCopy');
                        });
                    }
                }
            };
        })
    }
});