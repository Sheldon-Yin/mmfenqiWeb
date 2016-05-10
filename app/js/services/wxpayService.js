/**
 * Created by sheldon on 2016/4/25.
 */
define(function (require, exports, module) {
    'use strict';
    console.log('service');
    module.exports = function (app) {
        app.register.factory('Wxpay', ['$resource',
            function ($resource) {
                return $resource('/appinterface/appinterface_weixinMchPay', {}, {
                    query: {method: 'GET', params: {
                        orderName: 'mmfq',
                        type: 0
                    }}
                });
            }]);
    }
});