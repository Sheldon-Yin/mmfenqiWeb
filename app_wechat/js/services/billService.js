/**
 * Created by sheldon on 2016/4/26.
 */
define(function (require, exports, module) {
    'use strict';
    console.log('service');
    module.exports = function (app) {
        app.register.factory('MyBillList', ['$resource',
            function ($resource) {
                return $resource('/appinterface/query_my_bill',{},{
                    save: {method:'GET'}
                })
            }]);
        app.register.factory('BillDetail', ['$resource',
            function ($resource) {
                return $resource('/appinterface/query_early_repayment',{},{
                    query: {method:'GET'}
                })
            }]);
        app.register.factory('BillPay', ['$resource',
            function ($resource) {
                return $resource('/appinterface/repayment',{},{
                    query: {method:'GET'}
                })
            }]);
        app.register.factory('MyBillRecord', ['$resource',
            function ($resource) {
                return $resource('/appinterface/query_repayment_record',{},{
                    query: {method:'GET'}
                })
            }]);
        app.register.factory('verifyBankCard', ['$resource',
            function ($resource) {
                return $resource('/appinterface/verify_bank_card',{},{
                    save: {method:'POST'}
                })
            }]);
        app.register.factory('userGetCode', ['$resource',
            function ($resource) {
                return $resource('/appinterface/user_getcode',{},{
                    save: {method:'POST'}
                })
            }]);



    }
});
