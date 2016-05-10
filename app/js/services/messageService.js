/**
 * Created by sheldon on 2016/4/26.
 */
define(function (require, exports, module) {
    'use strict';
    console.log('service');
    module.exports = function (app) {
        app.register.factory('MessageService', ['$resource',
            function ($resource) {
                return $resource('/appinterface/user_getcode', {telephone:'@telephone'}, {
                    save: {
                        method: 'POST', params: {
                            smsFmtId: 'payCredit'
                        }
                    }
                })
            }]);
    }
});