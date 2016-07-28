/**
 * Created by sheldon on 2016/7/14.
 */
'use strict';
define(function (require, exports, module) {
    'use strict';
    console.log('service');
    module.exports = function (app) {
        app.register.factory('GroupBuy', ['$resource',
            function ($resource) {
                return {
                    list: function () {
                        return $resource('/appinterface/teamBuy_goods_list', {}, {
                            query: {
                                method: 'GET', params: {
                                }
                            }
                        })
                    },
                    detail: function () {
                        return $resource('/appinterface/getTeamBuyGoodsDetailByGoodsId', {}, {
                            query: {
                                method: 'GET', params: {
                                }
                            }
                        })
                    },
                    join: function () {
                        return $resource('/appinterface/createGrouponPayOrderBeforePay', {}, {
                            save: {
                                method: 'POST', params: {
                                }
                            }
                        })
                    },
                    mine: function () {
                        return $resource('/appinterface/my_teamBuy_order', {}, {
                            query: {
                                method: 'GET', params: {
                                }
                            }
                        })
                    }
                }
            }]);
    }
});