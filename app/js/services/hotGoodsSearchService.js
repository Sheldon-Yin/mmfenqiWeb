/**
 * Created by sheldon on 2016/4/21.
 */
define(function (require, exports, module) {
    'use strict';
    console.log('hotGoodsService');
    module.exports = function (app) {
        app.register.factory('hotGoodsSearch', ['$resource',
            function ($resource) {
                return $resource('/api/appinterface/query_hotGoodsList_app',
                    {
                        cityId: '@cityId',
                        index: '@index',
                        isHotGoods:'@isHot'
                    },
                    {
                        query: {
                            method: 'GET',
                            params: {
                                index:0,
                                cityId:0
                            }
                        }
                    });
            }]);
    }
});