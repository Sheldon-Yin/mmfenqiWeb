/**
 * Created by ChinaHp on 2016/7/5.
 */
angular.module('app')
    .factory('riskService', ['$resource',
        function ($resource) {
            return {
                //还款中账单查询
                queryRepaymentBillByPage: function () {
                    return $resource('/system/userBillInterface/queryRepaymentBillByPage', {}, {
                        query: {
                            method: 'GET', params: {}
                        }
                    })
                },
                //
                findUserBillInfoByBillId: function () {
                    return $resource('/system/userBillInterface/findUserBillInfoByBillId', {}, {
                        query: {
                            method: 'GET', params: {}
                        }
                    })
                },
                //逾期账单查询
                queryOverDueBillByPage: function () {
                    return $resource('/system/userBillInterface/queryOverDueBillByPage', {}, {
                        query: {
                            method: 'GET', params: {}
                        }
                    })
                },

                //逾期账单查询
                queryFinishBillByPage: function () {
                    return $resource('/system/userBillInterface/queryFinishBillByPage', {}, {
                        query: {
                            method: 'GET', params: {}
                        }
                    })
                },
                //添加回访记录
                addUserBillReturnVisitRecord: function () {
                    return $resource('/system/userBillInterface/addUserBillReturnVisitRecord', {}, {
                        save: {
                            method: 'POST', params: {}
                        }
                    })
                }


            }
        }]);    
