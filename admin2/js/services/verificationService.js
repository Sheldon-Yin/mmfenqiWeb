/**
 * Created by ChinaHp on 2016/7/7.
 */
angular.module('app')
    .factory('verificationService', ['$resource',
        function ($resource) {
            return {
                //用户实名认证查询
                queryRealNameAuthentication: function () {
                    return $resource('/system/query_real_name_authentication', {}, {
                        query: {
                            method: 'GET', params: {}
                        }
                    })
                },
                //更换角色
                change_user_roles: function () {
                    return $resource('/system/change_user_roles', {}, {
                        save: {
                            method: 'POST', params: {}
                        }
                    })
                },
                //下拉列表
                selectUserType: function () {
                    return $resource('/system/select_user_type', {}, {
                        query: {
                            method: 'GET', params: {}
                        }
                    })
                },
                //查询学生信用审核列表
                query_student_credit_info: function () {
                    return $resource('/system/query_student_credit_info', {}, {
                        query: {
                            method: 'GET', params: {}
                        }
                    })
                },
                //下拉查询学历类型
                select_education_type: function () {
                    return $resource('/system/select_education_type', {}, {
                        query: {
                            method: 'GET', params: {}
                        }
                    })
                },
                //学生学籍信息
                query_student_school_info: function () {
                    return $resource('/system/query_student_school_info', {}, {
                        query: {
                            method: 'GET', params: {}
                        }
                    })
                },
                //用户基本信息
                queryBasicInfo: function () {
                    return $resource('/system/query_basic_info', {}, {
                        query: {
                            method: 'GET', params: {}
                        }
                    })
                },
                //学生学籍信息编辑
                edit_student_info: function () {
                    return $resource('/system/edit_student_info', {}, {
                        save: {
                            method: 'POST', params: {}
                        }
                    })
                },
                //学生联系信息编辑
                edit_student_contact_info: function () {
                    return $resource('/system/edit_student_contact_info', {}, {
                        save: {
                            method: 'POST', params: {}
                        }
                    })
                },
                //查询芝麻信用认证信息
                query_user_sesame_credit: function () {
                    return $resource('/system/query_user_sesame_credit', {}, {
                        query: {
                            method: 'GET', params: {}
                        }
                    })
                },
                //查询电商认证信息
                query_business_credit_info: function () {
                    return $resource('/system/query_business_credit_info', {}, {
                        query: {
                            method: 'GET', params: {}
                        }
                    })
                },
                //查询银行流水信息
                query_bank_credit_info: function () {
                return $resource('/system/query_bank_credit_info', {}, {
                    query: {
                        method: 'GET', params: {}
                        }
                    })
                },
                //学生极速认证审核
                student_fast_auth: function () {
                return $resource('/system/student_fast_auth', {}, {
                    save: {
                        method: 'POST', params: {}
                        }
                    })
                },
                //学生银行卡流水认证审核
                studentBankCreditAuth: function () {
                return $resource('/system/student_bank_credit_auth', {}, {
                    save : {
                        method: 'POST', params: {}
                        }
                    })
                },
                student_business_credit_auth: function () {
                return $resource('/system/student_business_credit_auth', {}, {
                    save : {
                        method: 'POST', params: {}
                        }
                    })
                },


                //查询省份信息
                select_user_provs: function () {
                return $resource('/system/select_user_provs', {}, {
                    query: {
                        method: 'GET', params: {}
                        }
                    })
                },

                //查询城市信息
                selectUserCitys: function () {
                    return $resource('/system/select_user_citys', {}, {
                        query: {
                            method: 'GET', params: {}
                        }
                    })
                },

                //查询大学信息


                select_user_school: function () {
                    return $resource('/system/select_user_school', {}, {
                        query: {
                            method: 'GET', params: {}
                        }
                    })
                },



                //白领
                //查询白领信用审核列表
                query_whiteCollar_credit_info: function () {
                    return $resource('/system/query_whiteCollar_credit_info', {}, {
                        query: {
                            method: 'GET', params: {}
                        }
                    })
                },
                //变更用户姓名+身份证
                change_user_identityCode: function () {
                    return $resource('/system/change_user_identityCode', {}, {
                        save: {
                            method: 'POST', params: {}
                        }
                    })
                },

                //白领基础信息认证
                query_whiteCollar_basic_info: function () {
                    return $resource('/system/query_whiteCollar_basic_info', {}, {
                        query: {
                            method: 'GET', params: {}
                        }
                    })
                },
                //白领基础认证信息编辑
                edit_whitecollar_baseInfo: function () {
                    return $resource('/system/edit_whitecollar_baseInfo', {}, {
                        query: {
                            method: 'GET', params: {}
                        }
                    })
                },
                //白领极速认证审核
                whitecollar_fast_auth: function () {
                    return $resource('/system/whitecollar_fast_auth', {}, {
                        save: {
                            method: 'POST', params: {}
                        }
                    })
                },

                //白领电商认证审核
                whitecollar_business_credit_auth: function () {
                    return $resource('/system/whitecollar_business_credit_auth', {}, {
                        save: {
                            method: 'POST', params: {}
                        }
                    })
                },
                //白领银行卡流水认证审核
                whitecollar_bank_credit_auth: function () {
                    return $resource('/system/whitecollar_bank_credit_auth', {}, {
                        svae: {
                            method: 'POST', params: {}
                        }
                    })
                },










            }
        }]);
