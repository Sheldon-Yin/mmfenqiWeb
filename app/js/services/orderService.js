/**
 * Created by sheldon on 2016/4/26.
 */
define(function (require, exports, module) {
    'use strict';
    console.log('service');
    module.exports = function (app) {
        app.register.factory('QueryMyOrder', ['$resource',
            function ($resource) {
                return $resource('/api/appinterface/query_my_order',{},{
                    query: {method:'GET',params:{orderStatus:-1}}
                })
            }]);
        app.register.factory('CreateOrder', ['$resource',
            function ($resource) {
                return $resource('/api/appinterface/query_goods_staging_order_app',{},{
                    get: {method:'GET',params:{cityId:2}}
                })
            }]);
        app.register.factory('OrderInfoForEnsure', ['$resource',
            function ($resource) {
                return $resource('/api/appinterface/user_goods_confirm_order_app', {}, {
                    query:{
                        method: 'GET'
                    }
                });
            }]);
        app.register.factory('OrderDetails', ['$resource',
            function ($resource) {
                return $resource('/api/appinterface/query_order_detail', {}, {
                    query:{
                        method: 'GET'
                    }
                });
            }]);
        app.register.factory('CancelOrder', ['$resource',
            function ($resource) {
                return $resource('/api/appinterface/cancer_order', {}, {
                    query:{
                        method: 'GET'
                    }
                });
            }]);
    }
});
