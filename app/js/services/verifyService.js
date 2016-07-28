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
                    resultForVerifyBaseInfoForStudent: function () {
                        return $resource('/appinterface/query_fastCredit_info', {}, {
                            query: {
                                method: 'GET', params: {

                                }
                            }
                        })
                    },
                    verifyBankPayment: function () {
                        return $resource('/appinterface/bank_statement_credit', {}, {
                            save: {
                                method: 'POST', params: {

                                }
                            }
                        })
                    },
                    verifyBusiness: function () {
                        return $resource('/appinterface/business_credit_new', {}, {
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
                    },
                    verifyStudentFirst: function () {
                        return $resource('/appinterface/school_credit_new',{},{
                            save:{
                                method:'POST',params:{

                                }
                            }
                        })
                    },
                    verifyStudentSecond: function () {
                        return $resource('/appinterface/relation_credit',{},{
                            save:{
                                method:'POST',params:{

                                }
                            }
                        })
                    },
                    verifyStudentThird: function () {
                        return $resource('/appinterface/upload_identity_pic',{},{
                            save:{
                                method:'POST',params:{

                                }
                            }
                        })
                    },
                    getProvince: function () {
                        return $resource('/appinterface/get_province',{},{
                            query:{
                                method:'GET',params:{

                                }
                            }
                        })
                    },
                    getCity:  function () {
                        return $resource('/appinterface/get_city',{},{
                            query:{
                                method:'GET',params:{

                                }
                            }
                        })
                    },
                    getSchool:  function () {
                        return $resource('/appinterface/get_school',{},{
                            query:{
                                method:'GET',params:{

                                }
                            }
                        })
                    },
                    uploadContacts: function () {
                        return $resource('/appinterface/saveCommunite',{},{
                            save:{
                                method:'POST',params:{
                                }
                            }
                        })
                    },
                    verifyReForCaptcha: function () {
                        return $resource('/appinterface/reForCaptcha',{},{
                            save:{
                                method:'POST',params:{
                                }
                            }
                        })
                    }
                }
            }]);
    }
});