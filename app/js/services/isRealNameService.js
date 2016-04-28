/**
 * Created by sheldon on 2016/4/28.
 */
define(function (require, exports, module) {
    'use strict';
    console.log('service');
    module.exports = function (app) {
        app.register.factory('IsRealName', ['$resource',
            function ($resource) {
                return $resource('/api/appinterface/user_real_name_auth_flag',{cityId:'@cityId'},{
                    get: {method:'GET'}
                })
            }]);
    }
});
