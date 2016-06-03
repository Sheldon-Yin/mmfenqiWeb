/**
 * Created by sheldon on 2016/6/1.
 */
define(function (require, exports, module) {
    'use strict';
    console.log('service');
    module.exports = function (app) {
        app.register.factory('Treasure', ['$resource',
            function ($resource) {
                return {
                    userInfo: function () {
                        return $resource('/appinterface/my_account_info', {}, {
                            query: {
                                method: 'GET', params: {
                                }
                            }
                        })
                    },
                    treasureList: function () {
                        return $resource('/appinterface/duobao_index', {}, {
                            query: {
                                method: 'GET', params: {
                                }
                            }
                        })
                    },
                    treasureDetail: function () {
                        return $resource('/appinterface/query_duobao_goods_detail', {}, {
                            query: {
                                method: 'GET', params: {
                                }
                            }
                        })
                    },
                    lastWinner: function () {
                        return $resource('/appinterface/query_past_winner', {}, {
                            query: {
                                method: 'GET', params: {
                                }
                            }
                        })
                    },
                    honorRoll: function () {
                        return $resource('/appinterface/query_honor_roll', {}, {
                            query: {
                                method: 'GET', params: {
                                }
                            }
                        })
                    },
                    treasurePay: function () {
                        return $resource('/appinterface/duobao_recharge', {}, {
                            save: {
                                method: 'POST', params: {
                                }
                            }
                        })
                    },
                    cityList: function(){
                        return $resource('modules/treasure/other/city.json', {}, {
                            query: {method: 'GET', isArray: true}
                        });
                    }
                }
            }]);
    }
});