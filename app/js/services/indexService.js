/**
 * Created by sheldon on 2016/4/20.
 */
define(function (require, exports, module) {
    'use strict';
    console.log('service');
    module.exports = function (app) {
        app.register.factory('Index', ['$resource',
            function ($resource) {
                return $resource('/appinterface/query_index_app',{cityId:'@cityId'},{
                    get: {method:'GET'}
                })
            }]);
        app.register.factory('City', ['$resource',
            function ($resource) {
                return $resource('/appinterface/query_city_app',{},{
                    query: {method:'GET'}
                })
            }]);
    }
});

