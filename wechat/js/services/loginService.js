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
                    }
                }
            }]);
    }
});