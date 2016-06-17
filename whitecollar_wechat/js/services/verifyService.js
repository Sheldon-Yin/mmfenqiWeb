/**
 * Created by sheldon on 2016/5/23.
 */
define(function (require, exports, module) {
    'use strict';
    console.log('service');
    module.exports = function (app) {
        app.register.factory('Verify', ['$resource',
            function ($resource) {
                return {
                    isRealName: function () {
                        return $resource('/appinterface/user_real_name_auth_flag', {}, {
                            query: {
                                method: 'GET', params: {

                                }
                            }
                        })
                    },
                    verifyRealName: function () {
                        return $resource('/appinterface/user_real_name_auth', {}, {
                            save: {
                                method: 'POST', params: {

                                }
                            }
                        })
                    },
                    resultForVerifyBaseInfo: function () {
                        return $resource('/appinterface/query_white_collar_fastCredit', {}, {
                            query: {
                                method: 'GET', params: {

                                }
                            }
                        })
                    },
                    verifyBaseInfoFirst: function () {
                        return $resource('/appinterface/white_collar_credit_application', {}, {
                            save: {
                                method: 'POST', params: {

                                }
                            }
                        })
                    },
                    verifyBaseInfoSecond: function () {
                        return $resource('/appinterface/white_collar_auth_five', {}, {
                            save: {
                                method: 'POST', params: {

                                }
                            }
                        })
                    },
                    verifyBaseInfoThird: function () {
                        return $resource('/appinterface/white_collar_auth_four', {}, {
                            save: {
                                method: 'POST', params: {

                                }
                            }
                        })
                    },
                    verifyBankPayment: function () {
                        return $resource('/appinterface/payment_credit', {}, {
                            save: {
                                method: 'POST', params: {

                                }
                            }
                        })
                    },
                    verifyBusiness: function () {
                        return $resource('/appinterface/business_credit', {}, {
                            save: {
                                method: 'POST', params: {

                                }
                            }
                        })
                    },
                    queryVerifyStatus: function () {
                        return $resource('/appinterface/query_white_collar_credit', {}, {
                            query: {
                                method: 'GET', params: {

                                }
                            }
                        })
                    },
                    zmVerifyUrl: function () {
                        return $resource('/appinterface/authZMXY', {}, {
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