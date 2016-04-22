/**
 * Created by sheldon on 2016/4/21.
 */
define(function (require, exports, module) {
    'use strict';
    console.log('goodsService');
    module.exports = function (app) {
        app.register.factory('GoodsSearch', ['$resource',
            function ($resource) {
                return $resource('/api/appinterface/query_goodsList_app',
                    {
                        cityId: '@cityId',
                        index: '@index',
                        hospitalId: '@hospitalId',
                        categoryId: '@categoryId',
                        sortId: '@sortId',
                        searchInfo: '@keyword'
                    },
                    {
                        query: {
                            method: 'GET',
                            params: {
                                cityId: '0',
                                categoryId: '0',
                                sortId: '1',
                                hospitalId: '0'
                            }
                        }
                    });
            }]);
    }
});