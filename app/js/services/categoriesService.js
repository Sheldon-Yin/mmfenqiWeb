/**
 * Created by sheldon on 2016/4/21.
 */
define(function (require, exports, module) {
    'use strict';
    console.log('service');
    module.exports = function (app) {
        app.register.factory('Categories', ['$resource',
            function ($resource) {
                return $resource('/appinterface/query_category_app', {}, {
                    query: {method: 'GET', params: {}}
                });
            }]);
    }
});