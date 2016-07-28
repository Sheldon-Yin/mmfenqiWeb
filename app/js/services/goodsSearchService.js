/**
 * Created by sheldon on 2016/4/21.
 */
define(function (require, exports, module) {
    'use strict';
    console.log('goodsService');
    module.exports = function (app) {
        app.register.factory('GoodsSearch', ['$resource',
            function ($resource) {
                return $resource('/appinterface/query_goodsList_app',
                    {
                    },
                    {
                        query: {
                            method: 'GET',
                            params: {
                                categoryId: '0',
                                sortId: '1',
                                hospitalId: '0'
                            }
                        }
                    });
            }]);
    }
});