/**
 * Created by sheldon on 2016/4/25.
 */

define(function (require, exports, module) {
    'use strict';
    console.log('service');
    module.exports = function (app) {
        app.register.factory('Alipay', ['$resource',
            function ($resource) {
                return $resource('/api/alipayWap/appinterface_alipayWapPay', {cityId:'@cityId'}, {
                    query: {method: 'GET', params: {
                        orderName: 'mmfq',
                        type: 0
                    }}
                });
            }]);
    }
});