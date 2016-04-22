/**
 * Created by sheldon on 2016/4/21.
 */
define(function (require, exports, module) {
    'use strict';
    console.log('service');
    module.exports = function (app) {
        app.register.factory('GoodsDetail', ['$resource',
            function ($resource) {
                return $resource('/api/appinterface/query_goodsDetails_app', {}, {
                    get:{
                        params:{
                            goodsId: 344
                        }
                    }
                });
            }]);
    }
});