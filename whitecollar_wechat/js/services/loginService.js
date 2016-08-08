/**
 * Created by sheldon on 2016/5/20.
 */
define(function (require, exports, module) {
    'use strict';
    console.log('service');
    module.exports = function (app) {
        app.register.factory('Login', ['$resource',
            function ($resource) {
                return {
                    login: function () {
                        return $resource('/appinterface/user_login', {}, {
                            save: {
                                method: 'POST', params: {

                                }
                            }
                        })
                    },
                    isLogin:function(){
                        return $resource('/appinterface/check_is_login', {}, {
                            save: {
                                method: 'POST', params: {

                                }
                            }
                        })
                    },
                    isExist: function () {
                        return $resource('/appinterface/user_exist', {}, {
                            save: {
                                method: 'POST', params: {

                                }
                            }
                        })
                    },
                    resetPassword: function () {
                        return $resource('/appinterface/user_reset_password', {}, {
                            save: {
                                method: 'POST', params: {

                                }
                            }
                        })
                    },
                    fastLogin: function () {
                        return $resource('/appinterface/user_verify_code_login', {}, {
                            save: {
                                method: 'POST', params: {

                                }
                            }
                        })
                    },
                    getVerifyCode: function () {
                        return $resource('/appinterface/user_getcode', {}, {
                            save: {
                                method: 'POST', params: {

                                }
                            }
                        })
                    },
                    logOut: function () {
                        return $resource('/appinterface/user_logout', {}, {
                            save: {
                                method: 'POST', params: {

                                }
                            }
                        })
                    },
                    signUp: function () {
                        return $resource('/appinterface/user_register', {}, {
                            save: {
                                method: 'POST', params: {

                                }
                            }
                        })
                    },
                    query_staging:function () {
                    return $resource('/appinterface/query_staging',{},{
                        query:{
                            method:'GET',params:{

                            }

                        }
                    })
                },

                    business_register: function () {
                    return $resource('/appinterface/business_register', {}, {
                        save: {
                            method: 'POST', params: {

                            }
                        }
                    })
                },

                    query_staging_info: function () {
                        return $resource('/appinterface/query_staging_info', {}, {
                            query: {
                                method: 'GET', params: {

                                }
                            }
                        })
                    },


                    query_white_collar_credit:function () {
                        return $resource('/appinterface/query_white_collar_credit',{},{
                            query:{
                                method:'GET',params:{

                                }

                            }
                        })
                    },


                    add_store_intention_orders:function () {
                        return $resource('/appinterface/add_store_intention_orders',{},{
                            save:{
                                method:'POST',params:{

                                }

                            }
                        })
                    },
                    query_store_intention_orders:function () {
                        return $resource('/appinterface/query_store_intention_orders',{},{
                            query:{
                                method:'GET',params:{

                                }

                            }
                        })
                    },
                    update_store_intention_orders:function () {
                        return $resource('/appinterface/update_store_intention_orders',{},{
                            save:{
                                method:'POST',params:{

                                }

                            }
                        })
                    },








                }
            }]);
    }
});
