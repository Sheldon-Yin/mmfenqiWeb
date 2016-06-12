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
                                method: 'GET', params: {}
                            }
                        })
                    },
                    treasureList: function () {
                        return $resource('/appinterface/duobao_index', {}, {
                            query: {
                                method: 'GET', params: {}
                            }
                        })
                    },
                    treasureDetail: function () {
                        return $resource('/appinterface/query_duobao_goods_detail', {}, {
                            query: {
                                method: 'GET', params: {}
                            }
                        })
                    },
                    recordDetail: function () {
                        return $resource('/appinterface/query_my_duobao_goods_detail', {}, {
                            query: {
                                method: 'GET', params: {}
                            }
                        })
                    },
                    lastWinner: function () {
                        return $resource('/appinterface/query_past_winner', {}, {
                            query: {
                                method: 'GET', params: {}
                            }
                        })
                    },
                    honorRoll: function () {
                        return $resource('/appinterface/query_honor_roll', {}, {
                            query: {
                                method: 'GET', params: {}
                            }
                        })
                    },
                    treasurePay: function () {
                        return $resource('/appinterface/duobao_recharge', {}, {
                            save: {
                                method: 'POST', params: {}
                            }
                        })
                    },
                    cityList: function () {
                        return $resource('modules/treasure/other/city.json', {}, {
                            query: {method: 'GET', isArray: true}
                        });
                    },
                    inviteCode: function () {
                        return $resource('/appinterface/get_recommended_code', {}, {
                            query: {
                                method: 'GET', params: {}
                            }
                        });
                    },
                    shareList: function () {
                        return $resource('/appinterface/query_showAwards_list', {}, {
                            query: {
                                method: 'GET', params: {}
                            }
                        });
                    },
                    myShareList: function () {
                        return $resource('/appinterface/my_show', {}, {
                            query: {
                                method: 'GET', params: {}
                            }
                        });
                    },
                    myTreasureRecordList: function () {
                        return $resource('/appinterface/my_duobao_index', {}, {
                            query: {
                                method: 'GET', params: {}
                            }
                        });
                    },
                    myPrizeRecordList: function () {
                        return $resource('/appinterface/my_winning', {}, {
                            query: {
                                method: 'GET', params: {}
                            }
                        });
                    },
                    toPay: function () {
                        return $resource('/appinterface/duobao_toPay', {}, {
                            save: {
                                method: 'POST', params: {}
                            }
                        });
                    },
                    ensurePay: function () {
                        return $resource('/appinterface/duobao_comfirmPay', {}, {
                            save: {
                                method: 'POST', params: {}
                            }
                        });
                    },
                    getLocation: function () {
                        return $resource('/appinterface/temp_query_address', {}, {
                            query: {
                                method: 'GET', params: {}
                            }
                        });
                    },
                    saveLocation: function () {
                        return $resource('/appinterface/temp_edit_address ', {}, {
                            save: {
                                method: 'POST', params: {}
                            }
                        });
                    },
                    uploadShare:function () {
                        return $resource('/appinterface/upload_userTan ', {}, {
                            save: {
                                method: 'POST', params: {}
                            }
                        });
                    }
                }
            }]);
    }
});