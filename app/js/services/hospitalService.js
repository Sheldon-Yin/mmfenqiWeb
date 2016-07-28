/**
 * Created by sheldon on 2016/4/21.
 */
define(function (require, exports, module) {
    'use strict';
    console.log('service');
    module.exports = function (app) {
        app.register.factory('Hospital', ['$resource',
            function ($resource) {
                return $resource('/appinterface/query_hospital_app', {}, {
                    query: {method: 'GET',params:{}}
                });
            }]);
    }
});