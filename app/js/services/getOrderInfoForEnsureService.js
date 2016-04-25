/**
 * Created by sheldon on 2016/4/25.
 */
define(function (require, exports, module) {
    'use strict';
    console.log('service');
    module.exports = function (app) {
        app.register.factory('getOrderInfoForEnsure', ['$resource',
            function ($resource) {
                return $resource('/api/appinterface/user_goods_confirm_order_app', {}, {
                    query:{
                        method: 'GET'
                    }
                });
            }]);
    }
});