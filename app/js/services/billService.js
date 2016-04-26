/**
 * Created by sheldon on 2016/4/26.
 */
define(function (require, exports, module) {
    'use strict';
    console.log('service');
    module.exports = function (app) {
        app.register.factory('MyBillList', ['$resource',
            function ($resource) {
                return $resource('/api/appinterface/query_my_bill',{},{
                    query: {method:'GET'}
                })
            }]);
        app.register.factory('BillDetail', ['$resource',
            function ($resource) {
                return $resource('/api/appinterface/query_early_repayment',{},{
                    query: {method:'GET'}
                })
            }]);
        app.register.factory('BillPay', ['$resource',
            function ($resource) {
                return $resource('/api/appinterface/repayment',{},{
                    query: {method:'GET'}
                })
            }]);
        app.register.factory('MyBillRecord', ['$resource',
            function ($resource) {
                return $resource('/api/appinterface/query_repayment_record',{},{
                    query: {method:'GET'}
                })
            }]);
    }
});
