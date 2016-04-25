/**
 * Created by sheldon on 2016/4/25.
 */
define(function (require, exports, module) {
    'use strict';
    console.log('service');
    module.exports = function (app) {
        app.register.factory('QueryMyBill', ['$resource',
            function ($resource) {
                return $resource('/api/appinterface/query_my_bill',{},{
                    query: {method:'GET'}
                })
            }]);
    }
});
