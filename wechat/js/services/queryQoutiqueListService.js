/**
 * Created by sheldon on 2016/4/27.
 */
define(function (require, exports, module) {
    'use strict';
    console.log('service');
    module.exports = function (app) {
        app.register.factory('Qoutique', ['$resource',
            function ($resource) {
                return $resource('/appinterface/query_qoutiqueList_app',{},{
                    query: {method:'GET', params:{cityId:2}}
                })
            }]);
    }
});