/**
 * Created by sheldon on 2016/4/25.
 */
define(function (require, exports, module) {
    'use strict';
    console.log('service');
    module.exports = function (app) {
        app.register.factory('newOrder', ['$resource',
            function ($resource) {
                return $resource('/api/appinterface/query_goods_staging_order_app',{},{
                    get: {method:'GET',params:{cityId:2}}
                })
            }]);
    }
});

